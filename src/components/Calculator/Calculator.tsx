import { InputHTMLAttributes, useState } from 'react';
import { Loader } from '../Loader';

const Input = function ({
  name,
  value,
  onChange,
  placeholder,
  step = '1',
}: {
  name: string;
  value: InputHTMLAttributes<HTMLInputElement>['value'];
  onChange: (value: string) => void;
  placeholder: string;
  step?: string;
}) {
  return (
    <input
      type="number"
      step={step}
      value={value || ''}
      name={name}
      id={name}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-slate-800/40 outline-none ring-1 ring-transparent focus:ring-slate-700 text-white px-6 py-4 rounded-lg placeholder:text-slate-500/50"
    />
  );
};

const RequiredStar = () => <span className="text-red-500">*</span>;

export const Calculator = () => {
  const [request, setRequest] = useState<API.CalculationRequest>({
    algorithm: 1.0,
    target: 100,
  } as API.CalculationRequest);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<API.CalculationResponse>({
    _calculation: {
      algorithm: 1.0,
      dailyInsulinAverage: 0,
      insulinSensitivityFactor: 0,
      pumpRatio: 0,
    },
    sugar: {
      correctionDose: 0,
    },
    meal: {
      carbDose: 0,
    },
    totalDose: 0,
  } as API.CalculationResponse);

  const set = (key: keyof API.CalculationRequest, value: string) => {
    if (value === '') {
      setRequest({ ...request, [key]: null });
      return;
    }

    const floatValue = parseFloat(value.replace(',', '.'));
    if (isNaN(floatValue)) {
      return;
    }
    setRequest({ ...request, [key]: floatValue });
  };

  const fetchAPI = () => {
    fetch('/api/calculate', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        console.error(err);
        alert('Une erreur est survenue, veuillez réessayer plus tard');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAPI();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 my-10 gap-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 rounded-lg bg-slate-900/50 border border-slate-500/25 p-4"
      >
        <div className="col-span-2">
          <h5 className="text-lg">Glycemie</h5>
          <p className="text-slate-400">
            Renseigner votre glycemie et votre objectif (en mg/dL)
          </p>
        </div>
        <div className="flex flex-col space-y-2 justify-between">
          <label htmlFor="blood-sugar" className="text-slate-500">
            Glycemie avant repas (en mg/dL) <RequiredStar />
          </label>
          <Input
            name="blood-sugar"
            value={request.bloodSugar}
            onChange={(value) => set('bloodSugar', value)}
            placeholder="ex: 123"
          />
        </div>
        <div className="flex flex-col space-y-2 justify-between">
          <label htmlFor="target" className="text-slate-500">
            Objectif glycémique (en mg/dL)
          </label>
          <Input
            name="target"
            value={request.target}
            onChange={(value) => set('target', value)}
            placeholder="ex: 100"
          />
        </div>
        <hr className="col-span-2 border-slate-700" />
        <div className="col-span-2">
          <h5 className="text-lg">Repas</h5>
          <p className="text-slate-400">
            Renseigner votre repas (en grammes de glucides) <RequiredStar />
          </p>
        </div>
        <div className="flex flex-col col-span-2 space-y-2">
          {/* <label htmlFor="planned-carb-grams" className="text-slate-500">Gramme de glucide</label> */}
          <Input
            name="planned-carb-grams"
            value={request.plannedCarbGrams}
            onChange={(value) => set('plannedCarbGrams', value)}
            placeholder="ex: 55"
          />
        </div>
        <hr className="col-span-2 border-slate-700" />
        <div className="col-span-2">
          <h5 className="text-lg">Données de l&apos;utilisateur</h5>
          <p className="text-slate-400">
            Renseigner vos données, si vous ne les connaissez pas, contactez
            votre médecin
          </p>
        </div>
        <div className="flex flex-col space-y-2 justify-between">
          <label htmlFor="daily-insulin-average" className="text-slate-500">
            Moyenne d&apos;unité d&apos;insuline sur 14j <RequiredStar />
          </label>
          <Input
            name="daily-insulin-average"
            value={request.dailyInsulinAverage}
            onChange={(value) => set('dailyInsulinAverage', value)}
            step="0.1"
            placeholder="ex: 55.3"
          />
        </div>
        <div className="flex flex-col space-y-2 justify-between">
          <label htmlFor="algorithm" className="text-slate-500">
            Algorithme (unité d&apos;insuline pour 10g de glucides)
          </label>
          <Input
            name="algorithm"
            value={request.algorithm}
            step="0.1"
            onChange={(value) => set('algorithm', value)}
            placeholder="1.0"
          />
        </div>
        <div className="mt-4 col-span-2 [--tw-border-width:2px] [--tw-gradient-scale:2] rounded-lg button-gradient from-indigo-500 via-amber-500 via-50% to-indigo-500 shadow-lg shadow-indigo-500/50">
          {loading ? (
            <Loader className="rounded-lg bg-slate-900 transition-all duration-300 px-8 py-2 hover:px-16" />
          ) : (
            <button
              type="submit"
              className="rounded-lg w-full bg-slate-900 transition-all duration-300 px-8 py-4 hover:px-16"
            >
              Calculer pour moi !
            </button>
          )}
        </div>
      </form>
      <div className="p-4 bg-indigo-950/25 border border-indigo-500/25 rounded-lg flex flex-col">
        <div className="rounded-lg bg-indigo-500 saturate-150 text-white p-2 w-full">
          Remplissez le formulaire précédent pour voir les résultats !
        </div>

        {result.error && (
          <div className="rounded-lg bg-red-500 saturate-150 text-white p-2 w-full mt-4">
            Merci de remplir tous les champs obligatoires
          </div>
        )}

        <div className="flex flex-col flex-1">
          <div className="space-y-2">
            <h5 className="!mt-8">Données utiles</h5>
            <div className="flex flex-row justify-between items-end">
              <p className="text-indigo-300/50">
                Moy. d&apos;insuline par jour
              </p>
              <hr className="flex-1 mx-2 border-indigo-300/25" />
              <p className="text-indigo-300 font-bold">
                {result._calculation?.dailyInsulinAverage || 0}
              </p>
            </div>
            <div className="flex flex-row justify-between items-end">
              <p className="text-indigo-300/50">Votre insulino-resistance</p>
              <hr className="flex-1 mx-2 border-indigo-300/25" />
              <p className="text-indigo-300 font-bold">
                {result._calculation?.insulinSensitivityFactor || 0}
              </p>
            </div>
            <div className="flex flex-row justify-between items-end">
              <p className="text-indigo-300/50">
                Votre ratio pour pompe à insuline
              </p>
              <hr className="flex-1 mx-2 border-indigo-300/25" />
              <p className="text-indigo-300 font-bold">
                {result._calculation?.pumpRatio || 0}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="!mt-8">Injection</h5>
            <div className="flex flex-row justify-between items-end">
              <p className="text-indigo-300/50">Unité de correction</p>
              <hr className="flex-1 mx-2 border-indigo-300/25" />
              <p className="text-indigo-300 font-bold">
                {result.sugar?.correctionDose || 0}
              </p>
            </div>
            <div className="flex flex-row justify-between items-end">
              <p className="text-indigo-300/50">Unité de repas</p>
              <hr className="flex-1 mx-2 border-indigo-300/25" />
              <p className="text-indigo-300 font-bold">
                {result.meal?.carbDose || 0}
              </p>
            </div>
            <div className="flex flex-row justify-between items-end">
              <p className="text-indigo-300/50">Total</p>
              <hr className="flex-1 mx-2 border-indigo-300/25" />
              <p className="text-indigo-300 font-bold">
                {result.totalDose || 0}
              </p>
            </div>
          </div>

          <div className="w-full text-center flex-1 flex flex-col justify-center items-center my-10">
            <p className="title !text-4xl">Votre injection est de</p>
            <p className="title font-extrabold !text-8xl">
              {result.totalDose || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
