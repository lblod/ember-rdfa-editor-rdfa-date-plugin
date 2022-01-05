import RdfaDatePlugin from '../rdfa-date-plugin';

function pluginFactory(plugin) {
  return {
    create: (initializers) => {
      const pluginInstance = new plugin();
      Object.assign(pluginInstance, initializers);
      return pluginInstance;
    },
  };
}

export function initialize(application) {
  application.register('plugin:rdfa-date', pluginFactory(RdfaDatePlugin), {
    singleton: false,
  });
}

export default {
  initialize,
};
