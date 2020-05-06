class Page {
    constructor() {
        this.viewReference = undefined;
    }

    setViewReference(view) {
        this.viewReference = view;
    }

    createContainer(tag) {
        console.log(tag);
    }
};

export default Page;