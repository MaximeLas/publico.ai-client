import { Card, Tab, Tabs } from "react-bootstrap";
import { GuidingQuestion } from '../../types/Messages';

const temp = [0, 0, 0, 0, 0];

export interface QuestionsDisplayProps {
  questions: GuidingQuestion[];
  onQuestionSelect: (question: GuidingQuestion) => void;
}

function QuestionsDisplay() {
  return (
    <Card className="h-100 overflow-auto">
      <Tabs unmountOnExit>
        {temp.map((_, i) => (
          <Tab
            className="p-2 border-0"
            eventKey={`Question ${i}`}
            onSelect={() => console.log(`Question ${i} selected`)}
            key={i}
            title={`Question ${i}`}
          >
            <p className="fs-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto
              expetendis cotidieque quo cu, veri persius vituperata ei nec.
              Vivendum intellegat et qui, ei denique consequuntur vix. Sonet
              tibique sea et. Erroribus adipiscing id eam. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Unum dicam posidonium eu vix, sea eu ubique
              viderer civibus, oporteat signiferumque eos et. No dicam aperiam
              vis. Nibh detracto incorrupte eos eu, iuvaret perfecto eam in, his
              eu possit dolorum temporibus. Id mundi quando mandamus sit, est
              vide option accusata et. Usu ut commune mentitum, putent facete
              vim id. Scripta periculis ei eam, te pro movet reformidans.
              Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto
              expetendis cotidieque quo cu, veri persius vituperata ei nec.
              Scripta periculis ei eam, te pro movet reformidans.
            </p>
          </Tab>
        ))}
      </Tabs>
    </Card>
  );
}

export default QuestionsDisplay;
