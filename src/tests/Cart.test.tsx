import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { CartProvider, useCart } from "../app/contexts/CartContext";

// Test Component that uses the CartContext
const TestComponent = () => {
  const { cartItems, cartCount, addToCart, updateQty, removeFromCart, clearCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: 1,
      name: "Test Peyek",
      variant: "500gr",
      price: 50000,
      image: "/test.png",
      qty: 2,
    });
  };

  const handleUpdate = () => {
    updateQty(1, "500gr", 1);
  };

  const handleRemove = () => {
    removeFromCart(1, "500gr");
  };

  const totalHarga = cartItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  return (
    <div>
      <div data-testid="count">{cartCount}</div>
      <div data-testid="total">{totalHarga}</div>
      <div data-testid="items-length">{cartItems.length}</div>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleRemove}>Remove</button>
      <button onClick={clearCart}>Clear</button>
    </div>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.getByTestId("total").textContent).toBe("0");
  });

  it("should add item to cart and calculate total correctly", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add");
    await user.click(addButton);

    // Initial qty is 2, price is 50000. Total = 100000
    expect(screen.getByTestId("count").textContent).toBe("2");
    expect(screen.getByTestId("total").textContent).toBe("100000");
    expect(screen.getByTestId("items-length").textContent).toBe("1");
  });

  it("should update quantity and total correctly", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await user.click(screen.getByText("Add"));
    await user.click(screen.getByText("Update"));

    // Quantity should increase by 1, making it 3. Total = 150000
    expect(screen.getByTestId("count").textContent).toBe("3");
    expect(screen.getByTestId("total").textContent).toBe("150000");
  });

  it("should remove item correctly", async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await user.click(screen.getByText("Add"));
    await user.click(screen.getByText("Remove"));

    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.getByTestId("items-length").textContent).toBe("0");
  });
});
