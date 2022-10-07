import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RdfaDatePluginCardComponent extends Component {
  @tracked showCard = false;
  @tracked dateValue;
  @tracked dateElement;
  @tracked dateInDocument;
  @tracked onlyDate;

  constructor() {
    super(...arguments);
    this.args.controller.addTransactionDispatchListener(
      this.onTransactionDispatch
    );
  }

  willDestroy() {
    this.args.controller.removeTransactionDispatchListener(
      this.onTransactionDispatch
    );
    super.willDestroy();
  }

  @action
  modifyDate() {
    this.args.controller.perform((tr) => {
      tr.commands.modifyDate({
        element: this.dateElement,
        dateValue: this.dateValue,
        onlyDate: this.onlyDate,
      });
    });
  }

  @action
  changeDate(date) {
    this.dateValue = date;
    if (this.dateInDocument) this.modifyDate();
  }

  modifiesSelection(steps) {
    return steps.some(
      (step) => step.type === 'selection-step' || step.type === 'operation-step'
    );
  }

  onTransactionDispatch = (transaction) => {
    if (
      this.modifiesSelection(transaction.steps) &&
      transaction.currentSelection.lastRange
    ) {
      const selectionParent =
        transaction.currentSelection.lastRange.start.parent;
      const datatype = selectionParent.attributeMap.get('datatype');
      if (datatype === 'xsd:dateTime') {
        this.showCard = true;
        this.dateElement = selectionParent;
        const dateContent = selectionParent.attributeMap.get('content');
        this.dateValue = dateContent ? new Date(dateContent) : new Date();
        this.dateInDocument = !!dateContent;
        this.onlyDate = false;
      } else if (datatype === 'xsd:date') {
        this.showCard = true;
        this.dateElement = selectionParent;
        const dateContent = selectionParent.attributeMap.get('content');
        this.dateValue = dateContent ? new Date(dateContent) : new Date();
        this.dateInDocument = !!dateContent;
        this.onlyDate = true;
      } else {
        this.showCard = false;
        this.dateElement = undefined;
      }
    }
  };
}
