function getPermissions(father, child, permissions) {
  var permis = [];
  permissions.forEach(element => {
    if (father === element.moduleName && element.subModules) {
      element.subModules.forEach(subModule => {
        if (child === subModule.subModuleName) {
          permis = subModule.permissions;
          return;
        }
      });
    } else if (father === element.moduleName) {
      permis = element.permissions;
      return;
    }
  });

  return permis;
}
export default getPermissions;
