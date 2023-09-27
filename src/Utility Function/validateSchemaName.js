export function validateSchemaName(_, value) {
    if (/^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        "Schema name must start with a letter (a-z or A-Z) and can only contain letters (a-z, A-Z), numbers (0-9), or underscore (_)."
      )
    );
  }
  