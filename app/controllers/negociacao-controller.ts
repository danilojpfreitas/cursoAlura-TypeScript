import { DiasDaSemana } from './../enums/dias_da_semana.js';
import { MensagemView } from './../views/mensagem-view.js';
import { NegociacoesView } from './../views/negociacoes-view.js';
import { Negociacoes } from './../models/negociacoes.js';
import { Negociacao } from './../models/negociacao.js';
export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes;
    private negociacoesView = new NegociacoesView("#negociacoesView", true);
    private mensagemView = new MensagemView("#mensagemView");

    constructor() {
        this.inputData = document.querySelector("#data") as HTMLInputElement; 
        this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement;
        this.inputValor = document.querySelector("#valor") as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        )
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update("Apenas negociações em dias úteis são aceitas");
            return;
        }
            negociacao.data.setDate(12);
            this.negociacoes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaVew();
    }

    private ehDiaUtil (data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO
    }

    private limparFormulario(): void {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }

    private atualizaVew(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso");
    }
}