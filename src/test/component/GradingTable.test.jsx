import {describe, it} from 'vitest';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import GradingTable from "../../components/GradingTable.jsx";

describe("GradingTable Component", () => {

    it("Should render grading table", async () => {
        render(<GradingTable/>)
        expect(screen.getByTestId("grading-table")).toBeDefined()
    })
    it("Should have initial column under tbody", async () => {
        render(<GradingTable/>)
        const target = screen.getByTestId("grading-table").getElementsByTagName("tbody")[0]
        expect(target).toBeDefined()
        expect(target.children.length).toBe(1)
        expect(target.firstChild.children.length).toBe(5)
        // checking input aspek_penilaiain_1
        expect(target.firstChild.children[1].querySelector("select[name='aspek_penilaiain_1[]']")).toBeTruthy()
        expect(target.firstChild.children[1].querySelector("select[name='aspek_penilaiain_1[]']").children.length).toBeTruthy(10)

        // checking input aspek_penilaiain_2
        expect(target.firstChild.children[2].querySelector("select[name='aspek_penilaiain_2[]']")).toBeTruthy()
        expect(target.firstChild.children[2].querySelector("select[name='aspek_penilaiain_2[]']").children.length).toBeTruthy(10)

        // checking input aspek_penilaiain_3
        expect(target.firstChild.children[3].querySelector("select[name='aspek_penilaiain_3[]']")).toBeTruthy()
        expect(target.firstChild.children[3].querySelector("select[name='aspek_penilaiain_3[]']").children.length).toBeTruthy(10)

        // checking input aspek_penilaiain_4
        expect(target.firstChild.children[4].querySelector("select[name='aspek_penilaiain_4[]']")).toBeTruthy()
        expect(target.firstChild.children[4].querySelector("select[name='aspek_penilaiain_4[]']").children.length).toBeTruthy(10)

    })

    it("Should render add button", async () => {
        render(<GradingTable/>)
        expect(screen.getByText("Tambah Mahasiswa")).toBeDefined()
    })

    it("Should adding new row when click button", async () => {
        render(<GradingTable/>)
        await userEvent.click(screen.getByText("Tambah Mahasiswa"))

        const target = screen.getByTestId("grading-table").getElementsByTagName("tbody")[0]
        expect(target.children.length).toBe(2)
        // checking name label
        expect(target.lastChild.children[0].innerText).toBe("Mahasiswa 2")

        // checking input aspek_penilaiain_1
        expect(target.lastChild.children[1].querySelector("select[name='aspek_penilaiain_1[]']")).toBeTruthy()
        expect(target.lastChild.children[1].querySelector("select[name='aspek_penilaiain_1[]']").children.length).toBeTruthy(10)

        // checking input aspek_penilaiain_2
        expect(target.lastChild.children[2].querySelector("select[name='aspek_penilaiain_2[]']")).toBeTruthy()
        expect(target.lastChild.children[2].querySelector("select[name='aspek_penilaiain_2[]']").children.length).toBeTruthy(10)

        // checking input aspek_penilaiain_3
        expect(target.lastChild.children[3].querySelector("select[name='aspek_penilaiain_3[]']")).toBeTruthy()
        expect(target.lastChild.children[3].querySelector("select[name='aspek_penilaiain_3[]']").children.length).toBeTruthy(10)

        // checking input aspek_penilaiain_4
        expect(target.lastChild.children[4].querySelector("select[name='aspek_penilaiain_4[]']")).toBeTruthy()
        expect(target.lastChild.children[4].querySelector("select[name='aspek_penilaiain_4[]']").children.length).toBeTruthy(10)

        await userEvent.click(screen.getByText("Tambah Mahasiswa"))
        expect(target.children.length).toBe(3)
        // checking name label
        expect(target.lastChild.children[0].innerText).toBe("Mahasiswa 3")

        // checking input aspek_penilaiain_1
        expect(target.lastChild.children[1].querySelector("select[name='aspek_penilaiain_1[]']")).toBeTruthy()
        expect(target.lastChild.children[1].querySelector("select[name='aspek_penilaiain_1[]']").children.length).toBeTruthy(10)

        // checking input aspek_penilaiain_2
        expect(target.lastChild.children[2].querySelector("select[name='aspek_penilaiain_2[]']")).toBeTruthy()
        expect(target.lastChild.children[2].querySelector("select[name='aspek_penilaiain_2[]']").children.length).toBeTruthy(10)

        // checking input aspek_penilaiain_3
        expect(target.lastChild.children[3].querySelector("select[name='aspek_penilaiain_3[]']")).toBeTruthy()
        expect(target.lastChild.children[3].querySelector("select[name='aspek_penilaiain_3[]']").children.length).toBeTruthy(10)

        // checking input aspek_penilaiain_4
        expect(target.lastChild.children[4].querySelector("select[name='aspek_penilaiain_4[]']")).toBeTruthy()
        expect(target.lastChild.children[4].querySelector("select[name='aspek_penilaiain_4[]']").children.length).toBeTruthy(10)
    })

    it("Should disable add button after 10 student", async () => {
        render(<GradingTable/>)
        await userEvent.click(screen.getByText("Tambah Mahasiswa")) //2
        await userEvent.click(screen.getByText("Tambah Mahasiswa")) //3
        await userEvent.click(screen.getByText("Tambah Mahasiswa")) //4
        await userEvent.click(screen.getByText("Tambah Mahasiswa")) //5
        await userEvent.click(screen.getByText("Tambah Mahasiswa")) //6
        await userEvent.click(screen.getByText("Tambah Mahasiswa")) //7
        await userEvent.click(screen.getByText("Tambah Mahasiswa")) //8
        await userEvent.click(screen.getByText("Tambah Mahasiswa")) //9
        await userEvent.click(screen.getByText("Tambah Mahasiswa")) //10
        expect(screen.getByText("Tambah Mahasiswa")).toBeDisabled()
    })

    it("Should render submit button", async () => {
        render(<GradingTable/>)
        expect(screen.getByText("Simpan")).toBeDefined()
    })

    it("Should return json summary of grading", async () => {
        render(<GradingTable/>)
        await userEvent.click(screen.getByText("Simpan"))
        const expectation = {
            aspek_penilaian_1: {
                mahasiswa_1: '1',
            },
            aspek_penilaian_2: {
                mahasiswa_1: '1',
            },
            aspek_penilaian_3: {
                mahasiswa_1: '1',
            },
            aspek_penilaian_4: {
                mahasiswa_1: '1',
            },
        }
        expect(JSON.parse(screen.getByTestId("result-container").innerText)).toStrictEqual(expectation)
    })

    it("Should return json summary of grading after adding new row", async () => {
        render(<GradingTable/>)
        await userEvent.click(screen.getByText("Simpan"))
        const expectation = {
            aspek_penilaian_1: {
                mahasiswa_1: '1',
                mahasiswa_2: '1',
            },
            aspek_penilaian_2: {
                mahasiswa_1: '1',
                mahasiswa_2: '1',
            },
            aspek_penilaian_3: {
                mahasiswa_1: '1',
                mahasiswa_2: '1',
            },
            aspek_penilaian_4: {
                mahasiswa_1: '1',
                mahasiswa_2: '1',
            },
        }
        expect(JSON.parse(screen.getByTestId("result-container").innerText)).toStrictEqual(expectation)
    })
})

