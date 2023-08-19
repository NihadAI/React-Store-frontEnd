import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromFavorites } from "../slices/favoritesSlice";
class Favourites extends Component {
  handleRemoveFromFavorites = (product) => {
    this.props.removeFromFavorites(product);
  };
  handleAddToFavorites = (product) => {
    this.props.addToFavorites(product);
  };
  render() {
    const { favorites } = this.props;
    return (
      <div className="favorites-container">
        <h2>Your Favorites</h2>
        <div className="favorites-list">
          {favorites.map((product) => (
            <div key={product.id} className="favorite">
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <div className="details">
                <span>{product.desc}</span>
                <span className="price">${product.price}</span>
              </div>
              <button onClick={() => this.handleRemoveFromFavorites(product)}>
                Remove From Favorites
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  favorites: state.favorites.items,
});

const mapDispatchToProps = {
  removeFromFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);