const safeEval = require('safe-eval')

class CalcInput {
    constructor() {
        this.calc_input = document.getElementById("calc_input")
        this.calc_input.focus()
    }

    add_simple_char(operation) {
        this.calc_input.value += operation
        this.calc_input.focus()
    }

    get_value(){
        return this.calc_input.value
    }

    clear(){
        this.calc_input.value = ""
    }
}
const calc_input = new CalcInput()

class Calculs {

    constructor() {

        this.calc_list = document.getElementById('calc_result');

    }

    calc_result() {
        let calc = calc_input.get_value()
        if (calc){
            try {
                this.add_result(calc, safeEval(calc))
            } catch (e) {
                this.add_result(calc, "Err")
            }

            calc_input.clear()
        }
    }

    add_result (calc, result) {

        let calc_li = document.createElement("li")
        this.calc_list.prepend(calc_li)

        let calc_sublist = document.createElement("ul")
        calc_li.append(calc_sublist)

        let calc_subchild_calc = document.createElement("li")
        let calc_calc = document.createElement("p")
        calc_calc.innerText = calc

        calc_sublist.append(calc_subchild_calc)
        calc_subchild_calc.append(calc_calc)

        let calc_subchild_result = document.createElement("li")
        let calc_result = document.createElement("p")
        calc_result.setAttribute("class", "color_focus")
        calc_result.innerHTML = "= <span class='result color_lightwhite'>"+ result +"</span>"

        calc_sublist.append(calc_subchild_result)
        calc_subchild_result.append(calc_result)
    }

}

const calculs = new Calculs()

document.getElementById("result_button").addEventListener("click", ev => {
    calculs.calc_result()
})