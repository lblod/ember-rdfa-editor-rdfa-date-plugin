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
  /**
   * Handles the incoming events from the editor dispatcher.  Responsible for generating hint cards.
   *
   * @method execute
   *
   * @param {string} hrId Unique identifier of the state in the HintsRegistry.  Allows the
   * HintsRegistry to update absolute selected regions based on what a user has entered in between.
   * @param {Array} rdfaBlocks Set of logical blobs of content which may have changed.  Each blob is
   * either has a different semantic meaning, or is logically separated (eg: a separate list item).
   * @param {Object} hintsRegistry Keeps track of where hints are positioned in the editor.
   * @param {Object} editor Your public interface through which you can alter the document.
   *
   * @public
   */
  controller;

  get name() {
    return 'rdfa-date';
  }

  initialize(controller) {
    this.controller = controller;
    controller.onEvent('contentChanged', this.modelWrittenHandler.bind(this));
    controller.registerWidget({
      componentName: 'rdfa-date-plugin-card',
      identifier: 'rdfa-date-plugin/card',
      desiredLocation: 'sidebar',
    });
    controller.registerCommand(
      new ModifyDateCommand(controller._rawEditor._model)
    );
  }

  modelWrittenHandler(event) {
    if (event.owner !== this.name) {
      //TODO implement automatically date recognition and insertion
    }
  }
}
