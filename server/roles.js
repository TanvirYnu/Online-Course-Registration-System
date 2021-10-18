const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant("student")
        .readOwn("profile")
        .updateOwn("profile")

    ac.grant("teacher")
        .readOwn("profile")
        .updateOwn("profile")
        .deleteAny("profile")

    ac.grant("subAdmin")
        .extend("student")
        .readAny("profile")

    ac.grant("admin")
        .extend("student")
        .extend("subAdmin")
        .updateAny("profile")
        .deleteAny("profile")

    return ac;
})();