import React, { PureComponent } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator
} from "react-native";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Main = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerPokemons}>
        <Pokemons />
      </View>
    </ScrollView>
  );
};

const Pokemons = () => {
  const Query = gql(`
    query pokemons($first: Int!) {
      pokemons(first: $first) {
        id
        number
        name
        image
        types
      }
    }
  `);

  const { loading, error, data } = useQuery(Query, {
    variables: {
      first: 100
    }
  });

  if (loading)
    return (
      <View style={styles.loadingContent}>
        <ActivityIndicator size="large" color="#7800ff" />
      </View>
    );
  if (error) return <Text>Error :(</Text>;

  return data.pokemons.map(pokemon => (
    <View key={pokemon.id} style={styles.pokemon}>
      <View style={styles.pokemonImageContainer}>
        <Image
          className="pokemon-image"
          source={{ uri: pokemon.image }}
          style={styles.pokemonImage}
        />
      </View>
      <View style={styles.pokemonTextContainer}>
        <Text className="pokemon-name" style={styles.pokemonText}>
          {pokemon.number} - {pokemon.name}
        </Text>
        <View style={styles.pokemonTypeContainer}>
          {pokemon.types.map(type => (
            <Text
              key={type}
              className="pokemon-type"
              style={styles.pokemonTypeText}
            >
              {type}
            </Text>
          ))}
        </View>
      </View>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    marginTop: 25
  },
  loadingContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%"
  },
  containerPokemons: {
    flex: 1
  },
  pokemon: {
    marginBottom: 20
  },
  pokemonImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  pokemonImage: {
    width: 214,
    height: 214
  },
  pokemonTextContainer: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: 10,
    bottom: 0
  },
  pokemonText: {
    color: "#fff"
  },
  pokemonTypeContainer: {
    flexDirection: "row"
  },
  pokemonTypeText: {
    marginRight: 10,
    color: "#fff"
  }
});

export default Main;
