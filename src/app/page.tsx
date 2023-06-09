import { Calculator } from '@/components/Calculator';
import { Header } from '@/components/Header';
import { Subscribe } from '@/components/Subscribe';
import {
  faFaceThinking,
  faLeaf,
  faSparkles,
  faSyringe,
} from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tv } from 'tailwind-variants';

const blackhole = tv({
  slots: {
    container:
      'w-[var(--blackhole-size)] h-[var(--blackhole-size)] relative flex items-center justify-center',
    aura: 'w-full h-full relative flex items-center justify-center rounded-full',
    hole: 'w-[88%] h-[88%] rounded-full bg-gradient-to-r from-slate-950 from-60% blur-lg',
  },
});

const Blackhole = ({ className }: { className?: string }) => (
  <div
    className={blackhole().container({ className: className })}
    // @ts-ignore
    style={{ '--blackhole-size': 'min(100vw, 1130px)' }}
  >
    <div
      id="blackhole"
      className={blackhole().aura()}
      style={{
        transform: 'rotate(0deg)',
        animation: 'rotate 20s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
        boxShadow: `inset 0 0 calc(var(--blackhole-size)/6) #fff, inset calc(var(--blackhole-size)/15) 0 calc(var(--blackhole-size)/5) red, inset calc(var(--blackhole-size)/15*-1) 0 calc(var(--blackhole-size)/5) blue, inset calc(var(--blackhole-size)/15) 0 var(--blackhole-size) black, inset calc(var(--blackhole-size)/15*-1) 0 var(--blackhole-size) blue, 0 0 calc(var(--blackhole-size)/6) rgba(255, 255, 255, 0.75), -10px 0 calc(var(--blackhole-size)/5) violet, 10px 0 calc(var(--blackhole-size)/5) blue`,
      }}
    >
      {/* <div className={blackhole().hole()} /> */}
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <Blackhole className="fixed -z-10 top-[calc(var(--blackhole-size)/-3)] left-[calc(var(--blackhole-size)/-3)]" />
      <Header />

      <div className="p-8 lg:p-20 backdrop-filter backdrop-blur-md bg-slate-50/80 dark:bg-slate-950/80 space-y-20 w-full">
        <section className="text-center">
          <h2 className="title">
            <FontAwesomeIcon icon={faLeaf} className="text-indigo-400" />{' '}
            <span>
              Gérer le diabète n&apos;a jamais été aussi simple avec Glucidia
            </span>
          </h2>
          <p>
            Une application révolutionnaire pilotée par l&apos;intelligence
            artificielle pour gérer votre insulinothérapie en toute sérénité.
          </p>
        </section>

        <section className="text-center">
          <h2 className="title">
            <FontAwesomeIcon icon={faSyringe} className="text-indigo-400" />{' '}
            <span>Tester dès maintenant pour votre repas</span>
          </h2>
          <Calculator />
        </section>
      </div>

      <div className="p-8 lg:p-20 backdrop-filter backdrop-blur-md bg-slate-50/80 dark:bg-slate-950/80 grid grid-cols-1 sm:grid-cols-3 gap-5 space-y-10">
        <section className="col-start-2 col-span-2 text-justify">
          <h2 className="title">
            <FontAwesomeIcon icon={faSparkles} className="text-indigo-400" />{' '}
            <span>A propos de Glucidia</span>
          </h2>
          <p>
            Crée par un diabétique pour les diabétiques de type 1, Glucidia est
            une idée qui a germé dans la tête de son créateur, lui-même
            diabétique de type 1 depuis 2011, durant l&apos;apprentissage de son
            insulinothérapie fonctionnelle (ITF) au sein du centre hospitalier
            de Rennes Sud en juin 2023.
            <br />
            Parti d&apos;un fait simple, l&apos;insulinothérapie fonctionnelle
            est un traitement qui nécessite une grande rigueur et une grande
            précision dans le calcul des doses d&apos;insuline à injecter.
            <br />
            En effet, l&apos;ITF n&apos;est qu&apos;un calcul de dose
            d&apos;insuline en fonction de la quantité de glucides ingérés.
            Cependant ce calcul est une tâche fastidieuse et chronophage.
            C&apos;est pourquoi, Glucidia a été créé pour vous aider à calculer
            votre dose d&apos;insuline, et apprendre à mieux gérer votre
            diabète.
          </p>
        </section>

        <section className="col-start-2 sm:col-start-1 col-span-2 text-justify">
          <h2 className="title">
            <FontAwesomeIcon
              icon={faFaceThinking}
              className="text-indigo-400"
            />{' '}
            <span>Comment ça marche</span>
          </h2>
          <p>
            Gucidia à besoin de quelques informations pour fonctionner. Tout
            d&apos;abord, il vous faut créer un compte. Ensuite, il vous faut
            renseigner votre profil. Enfin, il vous faut renseigner votre
            traitement. Une fois ces informations renseignées, Glucidia est prêt
            à vous aider à gérer votre diabète.
            <br />
            Glucidia va calculer avec vous votre insulino-resistance, et le
            ratio glucidique en se basant sur les données que vous lui avez
            fourni. Par la suite, Glucidia va utiliser ces données pour adapter
            votre traitement à votre vie quotidienne.
            <br />
            Lors d&apos;une prise de repas, Glucidia va vous demander de
            renseigner la quantité de glucides ingérés. En fonction de cette
            quantité, Glucidia va calculer la dose d&apos;insuline à injecter.
            Vous n&apos;aurez plus qu&apos;à injecter la dose d&apos;insuline
            calculée par Glucidia.
          </p>
        </section>
      </div>
      <div className="pb-20 bg-slate-50 dark:bg-slate-950 text-center">
        <div className="flex-1 p-8 lg:p-20">
          <h1 className="font-display text-7xl sm:text-8xl font-bold text-center text-white">
            <span className="text-transparent title-gradient">Glucidia</span>
          </h1>
          <p className="text-2xl font-bold text-center text-white">
            <span className="text-transparent title-gradient">
              Rejoindre la communauté Glucidia
            </span>
          </p>
          <Subscribe />
        </div>
      </div>
    </main>
  );
}

// En effet,
//           l'insulinothérapie fonctionnelle est un traitement qui consiste à
//           injecter de l'insuline à chaque repas en fonction de la quantité de
//           glucides ingérés. Pour cela, il faut calculer la quantité de
//           glucides ingérés à chaque repas. C'est là que le bât blesse, car
//           calculer la quantité de glucides ingérés à chaque repas est une tâche
//           fastidieuse et chronophage. C'est pourquoi, Glucidia a été créé pour
//           vous aider à calculer la quantité de glucides ingérés à chaque repas
//           afin de vous permettre de gagner du temps et de vous concentrer sur
//           l'essentiel : votre santé.
