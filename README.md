# ember-rdfa-editor-rdfa-date-plugin
:warning: This ember addon is no longer maintained. Please use [@lblod/ember-rdfa-editor-lblod-plugins](https://github.com/lblod/ember-rdfa-editor-lblod-plugins) instead.

This plugin allows you interact with dates on the editor, it will find dates in the text, add the correct rdfa attributes and let you modify them in the plugin card

*Note*: this plugin uses the new plugin architecture. It needs to be passed to the editor for inititialization.

```handlebars
<Rdfa::RdfaEditor
  class="au-c-rdfa-editor"
  @profile={{@profile}}
  @rdfaEditorInit={{this.rdfaEditorInit}}
  @editorOptions={{this.editorOptions}}
  @toolbarOptions={{this.toolbarOptions}}
  @plugins={{array 'rdfa-date'}
/>
```


## Compatibility

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


## Installation

```
ember install @lblod/ember-rdfa-editor-rdfa-date-plugin
```


## Usage

The plugin will trigger when the cursor is inside any html element marked with `xsd:dateTime`


## License

This project is licensed under the [MIT License](LICENSE.md).
