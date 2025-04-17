import React, { useEffect } from "react";

// used to identify changes in the DOM like  adding/removing elements, changing attributes, etc.
// event bubbling,event delegation, and event capturing can be identified using this
const MutationObserverComponent = () => {
  useEffect(() => {
    const callbackMu = function (mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");
        } else if (mutation.type === "attributes") {
          console.log(
            "The " + mutation.attributeName + " attribute was modified."
          );
        }
      }
    };

    const observer = new MutationObserver(callbackMu);

    const targetNode = document.getElementById("target");
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
    };

    if (targetNode) {
      observer.observe(targetNode, config);
    }

    setTimeout(() => {
      if (targetNode) {
        targetNode.setAttribute("data-attribute", "newValue");
        const newNode = document.createElement("div");
        newNode.textContent = "New Child Node";
        targetNode.appendChild(newNode);
      }
    }, 5000);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h2>Mutation Observer</h2>
      <div id="target">Target Node</div>
    </div>
  );
};

export default MutationObserverComponent;
