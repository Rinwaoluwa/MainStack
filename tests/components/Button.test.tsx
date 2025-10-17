import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "../../src/components/Button/Button"

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })

  it("calls onClick handler when clicked", async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole("button", { name: /click me/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("renders disabled button", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled()
  })

  it("applies variant styles", () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole("button", { name: /secondary/i })
    expect(button).toHaveClass("secondary")
  })
})
