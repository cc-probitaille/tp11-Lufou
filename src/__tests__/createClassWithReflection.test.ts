import { StringCalculator } from "../stringCalculator";
import { createClassWithReflection } from "../createClassWithReflection";

describe("Création de classe par la réflexion", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    originalEnv = { ...process.env };
    Reflect.set(global, "StringCalculator", StringCalculator);
  });

  afterAll(() => {
    process.env = originalEnv;
    Reflect.deleteProperty(global, "StringCalculator");
  });

  it("devrait créer une instance valide de la classe qui a comme nom celui défini dans la variable d'environnement", () => {
    process.env.CLASS_NAME = "StringCalculator";
    const instance = createClassWithReflection();
    expect(instance).toBeInstanceOf(StringCalculator);
  });

  it("devrait renvoyer une erreur si le nom de la classe n'existe pas", () => {
    process.env.CLASS_NAME = "NonExistentClass";
    expect(() => createClassWithReflection()).toThrowError(
      "Classe 'NonExistentClass' introuvable"
    );
  });

  it("devrait renvoyer une erreur si la variable d'environnement CLASS_NAME n'est pas définie", () => {
    delete process.env.CLASS_NAME;
    expect(() => createClassWithReflection()).toThrowError(
      "La variable d'environnement 'CLASS_NAME' n'est pas définie"
    );
  });
});
