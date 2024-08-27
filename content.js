Object.defineProperty(document, 'visibilityState', {
    get: function() {
      return 'visible'; // Always return 'visible'
    }
  });
  
  Object.defineProperty(document, 'hidden', {
    get: function() {
      return false; // Always return false (not hidden)
    }
  });