import {describe, test} from 'vitest';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from "../App.jsx";

describe("App Component", () => {
    test("Should render grade component", async () => {
        render(<App />)
        expect(screen.getByTestId("grading-table")).toBeDefined()
    })
})
