const permissionsHandler = [
  {
    moduleName: "RRHH",
    subModules: [
      {
        subModuleName: "Usuarios",
        permission: ["create", "see", "modify", "delete"]
      },
      {
        subModuleName: "Roles",
        permission: ["create", "see", "modify", "delete"]
      }
    ]
  }
];

export default permissionsHandler;
