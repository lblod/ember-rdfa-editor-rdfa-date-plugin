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
    this.args.controller.onTransactionUpdate(this.handleTransactionUpdate);
  }

  @action
  handleTransactionUpdate(transaction, operation) {
    if (operation.type === 'selection-operation') {
      this.modelWrittenHandler(transaction.currentSelection);
    }
  }

  @action
  modifyDate() {
    this.args.controller.executeCommand(
      'modify-date',
      this.args.controller,
      this.dateElement,
      this.dateValue,
      this.onlyDate
    );
  }

  @action
  changeDate(date) {
    this.dateValue = date;
    if (this.dateInDocument) this.modifyDate();
  }

  @action
  modelWrittenHandler(selection) {
    const selectionParent = selection.lastRange.start.parent;
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
}
