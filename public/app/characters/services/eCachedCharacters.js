angular.module('app').factory('eCachedCharacters', function(eCharacter) {
  var characterList;

  return {
    query: function() {
      if (!characterList) {
        characterList = eCharacter.query();
      }

      return characterList;
    }
  };
});
