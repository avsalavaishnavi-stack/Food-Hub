import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { RestaurantCard, FoodCard, FoodContext } from './app';

// Mock Data
const mockRestaurant = {
  id: 1,
  name: "Pizza Hut",
  cuisine: "Italian, Pizzas, Garlic Bread",
  rating: 4.5,
  deliveryTime: 25,
  costForTwo: 500,
  category: "pizza",
  image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  description: "Indulge in fresh, hot pizzas with cheese pulls.",
  reviews: [],
  offers: []
};

const mockFoodItem = {
  id: 101,
  restaurantId: 1,
  name: "Margherita Pizza",
  price: 250,
  description: "Classic hand-tossed dough with fresh basil and mozzarella.",
  category: "Veg",
  image: ""
};

describe('FoodHub Unit & Integration Tests', () => {
  
  // Unit Test 1: Restaurant Card Name Renders
  it('renders restaurant name in RestaurantCard', () => {
    const mockContextVal = {
      favorites: [],
      toggleFavorite: () => {}
    };

    render(
      <FoodContext.Provider value={mockContextVal}>
        <BrowserRouter>
          <RestaurantCard restaurant={mockRestaurant} />
        </BrowserRouter>
      </FoodContext.Provider>
    );

    expect(screen.getByText("Pizza Hut")).toBeInTheDocument();
    expect(screen.getByText("Italian, Pizzas, Garlic Bread")).toBeInTheDocument();
  });

  // Unit Test 2: Correct Cart Total Calculation
  it('correctly calculates total price for cart items', () => {
    const cartItems = [
      { id: 101, name: "Margherita Pizza", price: 250, quantity: 2 }, // 500
      { id: 201, name: "Whopper Burger", price: 150, quantity: 1 }    // 150
    ];

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    expect(total).toBe(650);
  });

  // Integration Test: Add Item to Cart Flow
  it('integrates search & adding to cart updates cart state quantity', () => {
    let cart = [];
    const addToCartMock = (item) => {
      const existing = cart.find(i => i.id === item.id);
      if (existing) {
        cart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        cart.push({ ...item, quantity: 1 });
      }
    };

    const mockContext = {
      cartItems: cart,
      addToCart: addToCartMock,
      removeFromCart: () => {}
    };

    const { rerender } = render(
      <FoodContext.Provider value={mockContext}>
        <BrowserRouter>
          <FoodCard item={mockFoodItem} qty={0} onAdd={addToCartMock} onRemove={() => {}} />
        </BrowserRouter>
      </FoodContext.Provider>
    );

    // Verify ADD button is visible initially
    const addBtn = screen.getByText("ADD");
    expect(addBtn).toBeInTheDocument();

    // Click ADD to simulate adding to cart
    fireEvent.click(addBtn);

    // Verify item was added to cart array
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(101);
    expect(cart[0].quantity).toBe(1);

    // Rerender with updated mockContext
    const updatedContext = {
      cartItems: cart,
      addToCart: addToCartMock,
      removeFromCart: () => {}
    };

    rerender(
      <FoodContext.Provider value={updatedContext}>
        <BrowserRouter>
          <FoodCard item={mockFoodItem} qty={cart[0].quantity} onAdd={addToCartMock} onRemove={() => {}} />
        </BrowserRouter>
      </FoodContext.Provider>
    );

    // Verify that quantity controls are now visible instead of "ADD"
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("ADD")).not.toBeInTheDocument();
  });
});
