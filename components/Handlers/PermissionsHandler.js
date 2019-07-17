const permissionsHandler = [
  {
    moduleName: "RRHH",
    subModules: [
      {
        subModuleName: "Usuarios",
        permissionLow: [
          "Crear Usuario",
          "Ver Usuario",
          "Modificar Usuario Bajo Nivel",
          "Eliminar Usuario Bajo Nivel"
        ],
        permissionHigh: [
          "Modificar Usuario Alto Nivel",
          "Eliminar Usuario Alto Nivel"
        ]
      },
      {
        subModuleName: "Roles",
        permissionsLow: [
          "Crear Rol",
          "Ver Rol",
          "Modificar Rol Bajo Nivel",
          "Eliminar Rol Bajo Nivel"
        ],
        permissionHigh: ["Modificar Rol Alto Nivel", "Eliminar Rol  Alto Nivel"]
      }
    ]
  },
  {
    moduleName: "Clientes",
    subModules: [
      {
        subModuleName: "Usuarios",
        permissionLow: [
          "Crear Usuario",
          "Ver Usuario",
          "Modificar Usuario Bajo Nivel",
          "Eliminar Usuario Bajo Nivel"
        ],
        permissionHigh: [
          "Modificar Usuario Alto Nivel",
          "Eliminar Usuario Alto Nivel"
        ]
      },
      {
        subModuleName: "Roles",
        permissionsLow: [
          "Crear Rol",
          "Ver Rol",
          "Modificar Rol Bajo Nivel",
          "Eliminar Rol Bajo Nivel"
        ],
        permissionHigh: ["Modificar Rol Alto Nivel", "Eliminar Rol  Alto Nivel"]
      }
    ]
  },
  {
    moduleName: "Marina",
    subModules: [
      {
        subModuleName: "Usuarios",
        permissionLow: [
          "Crear Usuario",
          "Ver Usuario",
          "Modificar Usuario Bajo Nivel",
          "Eliminar Usuario Bajo Nivel"
        ],
        permissionHigh: [
          "Modificar Usuario Alto Nivel",
          "Eliminar Usuario Alto Nivel"
        ]
      },
      {
        subModuleName: "Roles",
        permissionsLow: [
          "Crear Rol",
          "Ver Rol",
          "Modificar Rol Bajo Nivel",
          "Eliminar Rol Bajo Nivel"
        ],
        permissionHigh: ["Modificar Rol Alto Nivel", "Eliminar Rol  Alto Nivel"]
      }
    ]
  }
];

export default permissionsHandler;
