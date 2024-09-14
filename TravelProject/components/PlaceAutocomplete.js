import React, { useEffect, useCallback, useRef, useState } from 'react'
import { FlatList, TouchableOpacity, Text, TextInput, View, ActivityIndicator } from 'react-native'
import AutocompleteServices from '../services/AutocompleteService';
import { SafeAreaView } from 'react-native-safe-area-context';

// TODO CODE OWN DROPDOWN

const debounce = (func, delay) => {
  const timeoutRef = useRef(null);

  const debouncedFunction = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  }, [func, delay]);

  return debouncedFunction;
};

const PlaceAutocomplete = ({place, setPlace}) => {
  const [apiKey, setApiKey] = useState(null);

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Fetching API key');
    const fetchApiKey = async () => {
      const key = await AutocompleteServices.getAutocompleteKey();
      setApiKey(key);
    };
    fetchApiKey();
  }, []);

  const getSuggestions = async (input) => {
    console.log('getSuggestions', input);
    const suggestions = await AutocompleteServices.getSuggestions(input, apiKey);
    const formattedSuggestions = suggestions.map(suggestion => ({
      id: suggestion.placePrediction.placeId,
      title: suggestion.placePrediction.text?.text,
    }));
    setSuggestions(formattedSuggestions);
    setLoading(false);
  };

  const debouncedSearch = debounce(getSuggestions, 1000);

  const handleSearch = (input) => {
    setInputValue(input);
    if (input.trim() === '') {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    debouncedSearch(input);
  }

  const handleSelect = (item) => {
    setInputValue(item.title);
    setPlace(item.title);
    console.log(inputValue);
    setSuggestions([]);
  }

  return (
      <>
        <SafeAreaView>
          <TextInput
            value={inputValue}
            onChangeText={handleSearch}
            placeholder="Search for a place"
          />
          {loading ? (
            <ActivityIndicator size="small" color="gray" />
          ) : (
            <View>
              <FlatList
                data={suggestions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item)}>
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </SafeAreaView>
      </>
    )
};

export default PlaceAutocomplete;