const { createCoreController } = require("@strapi/strapi/lib/factories");

const populateAttribute = ({ component, components }) => {
  if (!components) components = [component]
  if (components) {
    const populate = components.reduce((currentValue, current) => {
      const [componentDir, componentName] = current.split('.');

      /* Component attributes needs to be explicitly populated */
      const componentAttributes = Object.entries(
        require(`../components/${componentDir}/${componentName}.json`).attributes,
      )

      const attrPopulates = componentAttributes.reduce(
        (acc, [curr]) => ({ ...acc, [curr]: { populate: '*' } }),
        {},
      );

      return { ...currentValue, [current.split('.').pop()]: { populate: '*' }, ...attrPopulates };
    }, {});
    return { populate };
  }
  return { populate: '*' };
};

const getPopulateFromSchema = function (schema) {
  const result = {};
  const keys = Object.keys(schema.attributes);
  for (let i = 0; i < keys.length; i++) {
    const current = keys[i];
    const attribute = schema.attributes[current];
    if (["dynamiczone", "component"].includes(attribute.type)) {
      result[current] = populateAttribute(attribute);
    } else {
      result[current] = { populate: '*' };
    }
  }
  return result;
};

function createPopulatedController(uid, schema) {
  return createCoreController(uid, () => {
    console.log(schema.collectionName, getPopulateFromSchema(schema));
    return {
      async find(ctx) {
        ctx.query = {
          ...ctx.query,
          populate: getPopulateFromSchema(schema),
        };
        return await super.find(ctx);
      },
      async findOne(ctx) {
        ctx.query = {
          ...ctx.query,
          populate: getPopulateFromSchema(schema),
        };
        return await super.findOne(ctx);
      },
    };
  });
}

module.exports = createPopulatedController;