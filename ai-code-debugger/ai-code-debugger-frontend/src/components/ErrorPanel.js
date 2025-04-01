export const ErrorPanel = ({ errors }) => {
  console.log(errors); // Debugging

  // Filter out unintended errors
  const filteredErrors = errors.filter(error => !(error.line === 0 && error.message === "Error"));

  return (
    <div className="error-panel">
      <h2>Errors & Suggestions</h2>
      {filteredErrors.length === 0 ? (
        <p className="no-errors">No errors detected!</p>
      ) : (
        filteredErrors.map((error, index) => (
          <div key={index} className="error-item">
            <p><strong>Line {error.line}:</strong> {error.message}</p>
            <p>{error.explanation}</p>
            {error.suggestion && (
              <p>💡 <strong>Suggestion:</strong> {error.suggestion.replace(/\n/g, ' ')}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};