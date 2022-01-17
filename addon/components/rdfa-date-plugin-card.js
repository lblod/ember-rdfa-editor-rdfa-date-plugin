import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RdfaDatePluginCardComponent extends Component {
  @tracked showCard = false;
  @tracked dateValue;

  constructor() {
    super(...arguments);
    this.args.controller.onEvent('contentChanged', this.modelWrittenHandler);
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
  }

  @action
  modelWrittenHandler() {
    const selectionParent =
      this.args.controller.selection.lastRange.start.parent;
    const datatype = selectionParent.attributeMap.get('datatype');
    if (datatype === 'xsd:dateTime') {
      this.showCard = true;
      this.dateElement = selectionParent;
      this.dateValue = this.dateValue = selectionParent.attributeMap.get(
        'content'
      )
        ? new Date(selectionParent.attributeMap.get('content'))
        : new Date();
      this.onlyDate = false;
    } else if (datatype === 'xsd:date') {
      this.showCard = true;
      this.dateElement = selectionParent;
      this.dateValue = selectionParent.attributeMap.get('content')
        ? new Date(selectionParent.attributeMap.get('content'))
        : new Date();
      this.onlyDate = true;
    } else {
      this.showCard = false;
      this.dateElement = undefined;
    }
  }
}
