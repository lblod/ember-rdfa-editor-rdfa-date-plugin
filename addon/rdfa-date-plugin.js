import ModifyDateCommand from './commands/modify-date-command';

/**
 * Entry point for RdfaDate
 *
 * @module editor-rdfa-date-plugin
 * @class RdfaDatePlugin
 * @constructor
 * @extends EmberService
 */
export default class RdfaDatePlugin {
  get name() {
    return 'rdfa-date';
  }

  initialize(transaction, controller) {
    transaction.registerWidget(
      {
        componentName: 'rdfa-date-plugin-card',
        identifier: 'rdfa-date-plugin/card',
        desiredLocation: 'sidebar',
      },
      controller
    );
    transaction.registerWidget(
      {
        componentName: 'rdfa-date-plugin-insert',
        identifier: 'rdfa-date-plugin/insert',
        desiredLocation: 'insertSidebar',
      },
      controller
    );
    transaction.registerCommand('modifyDate', new ModifyDateCommand());
  }
}
