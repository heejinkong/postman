export function* registerWorkspaceAsync(action) {
    console.log(action);
    yield console.log("finish");
  }