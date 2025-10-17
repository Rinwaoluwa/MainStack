import { render, screen } from "@testing-library/react"
import { Card } from "../../src/components/Card/Card"

describe("Card Component", () => {
  it("renders card with children", () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText("Card content")).toBeInTheDocument()
  })

  it("renders with title and description", () => {
    render(
      <Card title="Test Title" description="Test Description">
        Content
      </Card>,
    )
    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
  })
})
