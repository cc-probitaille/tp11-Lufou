export function createClassWithReflection(): any {
  const className = process.env.CLASS_NAME;
  if (!className) {
    throw new Error("La variable d'environnement 'CLASS_NAME' n'est pas définie");
  }

  const ClassReference = Reflect.get(global, className);
  if (!ClassReference) {
    throw new Error(`Classe '${className}' introuvable`);
  }

  return new ClassReference();
}