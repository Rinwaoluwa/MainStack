import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "../../src/components/Input/Input"

describe("Input Component", () => {
  it("renders input element", () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
  })

  it("updates value on user input", async () => {
    render(<Input />)
    const input = screen.getByRole("textbox")

    await userEvent.type(input, "test value")
    expect(input).toHaveValue("test value")
  })

  it("renders with label", () => {
    render(<Input label="Email" />)
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("shows error message", () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText("This field is required")).toBeInTheDocument()
  })
})
