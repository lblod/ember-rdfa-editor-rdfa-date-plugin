import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class RdfaDatePluginInsertComponent extends Component {
  @action
  insertDate() {
    this.args.controller.perform((tr) => {
      tr.commands.insertHtml({
        htmlString:
          '<span datatype="xsd:date" property="ext:content">${date}</span>',
      });
    });
  }

  @action
  insertDateTime() {
    this.args.controller.perform((tr) => {
      tr.commands.insertHtml({
        htmlString:
          '<span datatype="xsd:dateTime" property="ext:content">${date and time}</span>',
      });
    });
  }
}
