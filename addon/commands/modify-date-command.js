export default class ModifyDateCommand {
  name = 'modify-date';

  constructor(model) {
    this.model = model;
  }

  canExecute() {
    return true;
  }

  execute(controller, element, dateValue) {
    this.model.change((mutator) => {
      const range =  controller.ModelRange.fromInElement(element, 0, element.getMaxOffset());
      mutator.insertText(range, this.formatDate(dateValue));
      element.attributeMap.set('content', dateValue.toISOString())
    })
  }
  formatDate(date) {
    let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('nl-BE', options)
  }
}
