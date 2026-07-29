const layerStack = [];

function registerDismissableLayer(token) {
  layerStack.push(token);

  return () => {
    const index = layerStack.lastIndexOf(token);
    if (index >= 0) layerStack.splice(index, 1);
  };
}

function isTopDismissableLayer(token) {
  return layerStack[layerStack.length - 1] === token;
}

export { isTopDismissableLayer, registerDismissableLayer };
