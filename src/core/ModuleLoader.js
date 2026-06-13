import ModuleLoader from "./ModuleLoader.js";
export default class ModuleLoader {

    constructor() {

        this.modules = new Map();
    }

    async register(name, moduleFactory) {

        if (this.modules.has(name)) {

            throw new Error(
                `Module already loaded: ${name}`
            );
        }

        const module =
            await moduleFactory();

        this.modules.set(
            name,
            module.default || module
        );

        return this;
    }

    get(name) {

        if (!this.modules.has(name)) {

            throw new Error(
                `Module not found: ${name}`
            );
        }

        return this.modules.get(name);
    }

    has(name) {

        return this.modules.has(name);
    }

    all() {

        return [...this.modules.values()];
    }

    count() {

        return this.modules.size;
    }
}
