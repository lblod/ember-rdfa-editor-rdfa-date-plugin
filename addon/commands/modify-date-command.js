export default class ModifyDateCommand {
  name = 'modify-date';

  arguments = ['element', 'dateValue', 'onlyDate'];

  canExecute() {
    return true;
  }

  execute({ transaction }, { element, dateValue, onlyDate }) {
    const range = transaction.rangeFactory.fromInElement(
      element,
      0,
      element.getMaxOffset()
    );
    transaction.insertText({
      range: range,
      text: this.formatDate(dateValue, onlyDate),
      marks: range.getMarks(),
    });
    element.attributeMap.set('content', dateValue.toISOString());
  }

  formatDate(date, onlyDate) {
    let options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    if (onlyDate) {
      options.hour = undefined;
      options.minute = undefined;
    }
    return date.toLocaleString('nl-BE', options);
  }
}
