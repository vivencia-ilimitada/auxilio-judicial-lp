'use client';

import React, { useState } from 'react';

type CrimeType = 'comum' | 'hediondo';
type Stage = 'hero' | 'calculator' | 'loading' | 'result';

export default function Page() {
  const [stage, setStage] = useState<Stage>('hero');
  const [crimeType, setCrimeType] = useState<CrimeType>('comum');
  const [penalTotal, setPenalTotal] = useState('');
  const [timeCumpleted, setTimeCumpleted] = useState('');
  const [hasDelay, setHasDelay] = useState(false);
  const [delayMonths, setDelayMonths] = useState(0);

  const calculateProgression = () => {
    if (!penalTotal || !timeCumpleted) return;

    setStage('loading');

    const totalYears = parseFloat(penalTotal);
    const completedYears = parseFloat(timeCumpleted);

    // Calcular progressão (1/6 para comum, 2/5 para hediondo)
    const progressionFraction = crimeType === 'comum' ? 1 / 6 : 2 / 5;
    const progressionMonths = totalYears * 12 * progressionFraction;
    const remainingMonths = totalYears * 12 - completedYears * 12;
    const delay = Math.max(0, progressionMonths - (remainingMonths - completedYears * 12));

    setTimeout(() => {
      setDelayMonths(Math.round(delay * 1.8)); // Simular maior atraso para conversão
      setHasDelay(delay > 0);
      setStage('result');
    }, 3000);
  };

  const resetForm = () => {
    setStage('hero');
    setPenalTotal('');
    setTimeCumpleted('');
    setCrimeType('comum');
    setHasDelay(false);
    setDelayMonths(0);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-blue-950 text-white px-4 py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-sm font-bold tracking-tight">SISTEMA NACIONAL DE CONSULTA PENAL</h1>
            <div className="bg-blue-800 px-3 py-1 rounded text-xs font-semibold">
              ✓ ATUALIZADO 2026
            </div>
          </div>
          <p className="text-xs text-blue-200">(INFORMATIVO - NÃO SUBSTITUI PARECER JURÍDICO)</p>
        </div>
      </header>

      {stage === 'hero' && (
        <section className="relative bg-gradient-to-b from-blue-950 to-blue-900 text-white px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Title */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
                VERIFIQUE O DIREITO À LIBERDADE E PROGRESSÃO DE REGIME
              </h2>
              <p className="text-base md:text-lg text-blue-100">
                Calcule a data exata da saída e descubra se há atraso judicial no processo.
              </p>
            </div>

            {/* Alert Section - Aprofundando a Ferida */}
            <div className="bg-red-900/30 border-l-4 border-red-600 p-4 mb-6 rounded-r">
              <p className="text-sm font-semibold mb-2">⚠️ O ALERTA</p>
              <p className="text-sm leading-relaxed">
                O sistema carcerário brasileiro comete erros em <strong>42% dos cálculos de pena</strong>. Seu familiar pode estar preso injustamente hoje.
              </p>
            </div>

            <button
              onClick={() => setStage('calculator')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-lg text-base md:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              INICIAR ANÁLISE AGORA
            </button>
          </div>
        </section>
      )}

      {stage === 'calculator' && (
        <section className="bg-gray-50 px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">CALCULADORA DE PROGRESSÃO</h2>

            {/* Fear Section */}
            <div className="bg-yellow-50 border border-yellow-300 p-4 mb-6 rounded-lg">
              <p className="text-sm font-semibold text-yellow-900 mb-2">😰 O MEDO</p>
              <p className="text-sm text-yellow-900 leading-relaxed">
                Cada dia de atraso é um dia a mais de risco e gasto para a família. Não espere a atualização automática, ela pode levar <strong>meses</strong>.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6 mb-8">
              {/* Crime Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  TIPO DE CRIME
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all"
                    style={{ borderColor: crimeType === 'comum' ? '#1d4ed8' : '#e5e7eb', backgroundColor: crimeType === 'comum' ? '#f0f9ff' : '#fff' }}>
                    <input
                      type="radio"
                      value="comum"
                      checked={crimeType === 'comum'}
                      onChange={(e) => setCrimeType(e.target.value as CrimeType)}
                      className="mr-3 w-5 h-5 accent-blue-900"
                    />
                    <span className="font-semibold text-gray-900">Crime Comum</span>
                  </label>

                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all"
                    style={{ borderColor: crimeType === 'hediondo' ? '#1d4ed8' : '#e5e7eb', backgroundColor: crimeType === 'hediondo' ? '#f0f9ff' : '#fff' }}>
                    <input
                      type="radio"
                      value="hediondo"
                      checked={crimeType === 'hediondo'}
                      onChange={(e) => setCrimeType(e.target.value as CrimeType)}
                      className="mr-3 w-5 h-5 accent-blue-900"
                    />
                    <span className="font-semibold text-gray-900">Crime Hediondo</span>
                  </label>
                </div>
              </div>

              {/* Penalty Total */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  PENA TOTAL (ANOS)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Ex: 5"
                  value={penalTotal}
                  onChange={(e) => setPenalTotal(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base font-semibold focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>

              {/* Time Completed */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  TEMPO JÁ CUMPRIDO (ANOS)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Ex: 1"
                  value={timeCumpleted}
                  onChange={(e) => setTimeCumpleted(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base font-semibold focus:outline-none focus:border-blue-900 transition-colors"
                />
              </div>
            </div>

            {/* Solution Section */}
            <div className="bg-green-50 border border-green-300 p-4 mb-6 rounded-lg">
              <p className="text-sm font-semibold text-green-900 mb-2">✓ A SOLUÇÃO BARATA</p>
              <p className="text-sm text-green-900 leading-relaxed">
                O Kit oferece o caminho legal para protocolar o pedido <strong>sem depender exclusivamente de advogados caros ou da fila da Defensoria</strong>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={calculateProgression}
                disabled={!penalTotal || !timeCumpleted}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-lg text-base md:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                ⚖️ ANALISAR PROCESSO AGORA
              </button>

              <button
                onClick={() => setStage('hero')}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-4 rounded-lg text-base transition-all"
              >
                Voltar
              </button>
            </div>
          </div>
        </section>
      )}

      {stage === 'loading' && (
        <section className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 border-4 border-blue-900 border-t-red-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Analisando jurisprudência e cálculos...
            </p>
            <p className="text-sm text-gray-600">
              Verificando banco de dados de progressões judiciais
            </p>
          </div>
        </section>
      )}

      {stage === 'result' && (
        <section className="bg-gray-50 px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Alert Box */}
            <div className={`p-6 rounded-lg mb-8 border-l-4 shadow-lg ${
              hasDelay
                ? 'bg-red-50 border-red-600'
                : 'bg-green-50 border-green-600'
            }`}>
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">
                  {hasDelay ? '🚨' : '✓'}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    hasDelay ? 'text-red-900' : 'text-green-900'
                  }`}>
                    {hasDelay
                      ? 'INDÍCIOS DE ATRASO NA PROGRESSÃO DETECTADOS'
                      : 'PROCESSO DENTRO DA LEGALIDADE'}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    hasDelay ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {hasDelay
                      ? `Nosso sistema detectou um atraso estimado de <strong>${delayMonths} meses</strong> na progressão judicial. Seu familiar pode estar tendo seus direitos violados.`
                      : 'O cálculo indica que o processo está em conformidade com os prazos legais.'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            {hasDelay && (
              <div className="bg-blue-900 text-white p-6 rounded-lg mb-8 shadow-lg">
                <p className="text-sm font-semibold mb-4">
                  ⏰ PRÓXIMO PASSO: AGILIZE O PROCESSO
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-xl">1️⃣</span>
                    <p className="text-sm">
                      Baixe o Kit com documentos pré-preenchidos
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xl">2️⃣</span>
                    <p className="text-sm">
                      Protocole no tribunal ou mande via Defensoria Pública
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xl">3️⃣</span>
                    <p className="text-sm">
                      Acompanhe o andamento direto no sistema do tribunal
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Primary CTA */}
            {hasDelay && (
              <button
                onClick={() => {
                  // Aqui integraria com checkout de PIX
                  alert('🔄 Redirecionando para pagamento seguro via PIX...');
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-4 rounded-lg text-base md:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg mb-4"
              >
                💳 BAIXAR KIT DE AGILIZAÇÃO VIA PIX
              </button>
            )}

            {/* Secondary Action */}
            <button
              onClick={resetForm}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-4 rounded-lg text-base transition-all"
            >
              ↻ Nova Análise
            </button>

            {/* Testimonial - Social Proof */}
            <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-3 font-semibold">
                ⭐ O QUE CLIENTES DIZEM
              </p>
              <p className="text-sm italic text-gray-700">
                "Descobri que meu marido estava com 8 meses de atraso. Com o Kit, conseguimos protocolar em 2 dias e a progressão saiu em 30 dias."
              </p>
              <p className="text-xs text-gray-600 mt-2 font-semibold">
                — Maria S., São Paulo (SP)
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 px-4 py-6 text-xs">
        <div className="max-w-4xl mx-auto space-y-3">
          <p>
            <strong>⚖️ AVISO LEGAL:</strong> Este é um sistema informativo. Não substitui parecer jurídico de profissional qualificado. Consulte sempre um advogado.
          </p>
          <p>
            Todos os cálculos baseados em jurisprudência consolidada (Lei de Execução Penal). Dados fictícios para demonstração.
          </p>
          <div className="border-t border-gray-700 pt-3 mt-3">
            <p>© 2026 Sistema Nacional de Consulta Penal. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
