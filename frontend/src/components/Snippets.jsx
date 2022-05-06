import React from "react";
import Snippet from "./Snippet";

function Snippets({ snippets, onViewFullSnippet, isProfile }) {
  return (
    <div>
      {snippets.map((snippet) => (
        <Snippet
          key={snippet._id}
          snippet={snippet}
          onViewFullSnippet={onViewFullSnippet}
          isProfile={isProfile}
        />
      ))}
    </div>
  );
}

export default Snippets;
