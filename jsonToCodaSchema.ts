function jsonToCodaSchema(data: any, shouldIncludeEmptyArrays: boolean) {
  console.log(
    "coda.makeObjectSchema({properties: {" +
    dataRecursion(data, shouldIncludeEmptyArrays) +
    "},});"
  );
}

/**
 * Adds two numbers together.
 * @param {Object} data the JSON object to be converted to the coda Schema.
 * @param {boolean} shouldIncludeEmptyArrays whether empty Arrays should be
 * included.If this is set to 'true' you will have to manually adjust the
 * result to specify the type of Array.
 * @return {String} Your generated Coda Scheme.
 */
function dataRecursion(
  data: object,
  shouldIncludeEmptyArrays: boolean
): string {
  let code = "";
  if (data !== undefined && data !== null) {
    for (const [key, value] of Object.entries(data)) {
      if (key.length > 0) {
        switch (typeof value) {
          case "object":
            if (
              value instanceof Array &&
              (shouldIncludeEmptyArrays || value.length > 0)
            ) {
              code += `${key}: { type: coda.ValueType.Array, 
                                fromKey: "${key}", items:\n`;
              switch (typeof value[0]) {
                case "number":
                  code += `{ type: coda.ValueType.Number },\n },\n`;
                  break;
                case "string":
                  code += `{ type: coda.ValueType.String },\n },\n`;
                  break;
                case "boolean":
                  code += `{ type: coda.ValueType.Boolean },\n },\n`;
                  break;
                case "object":
                  code += `{ type: coda.ValueType.Object, \n properties: 
                          {${dataRecursion(value, shouldIncludeEmptyArrays)}}
                          ,\n },\n },\n`;
                  break;
                default:
                  code += "{type: ***TODO***}}\n";
                  break;
              }
            } else {
              if (value && Object.keys(value).find((val) => val.length > 0)) {
                code += `${key}: { type: coda.ValueType.Object, 
                  fromKey: "${key}", \n properties:{
                    ${dataRecursion(value, shouldIncludeEmptyArrays)}}},`;
              }
            }
            break;
          case "string":
            code += `${key}: 
                        { type: coda.ValueType.String, fromKey: "${key}" },\n`;
            break;
          case "number":
            code += `${key}: 
                        { type: coda.ValueType.Number, fromKey: "${key}" },\n`;
            break;
          case "boolean":
            code += `${key}: 
                        { type: coda.ValueType.Boolean, fromKey: "${key}" },\n`;
            break;
          default:
            break;
        }
      }
    }
  }
  return code;
}
