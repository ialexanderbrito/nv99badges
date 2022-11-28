import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import { CgBorderStyleSolid } from 'react-icons/cg';

export function verifyVariationRanking(variation: string) {
  if (variation === 'STABLE') {
    return <CgBorderStyleSolid className="text-white" />;
  }

  if (variation === 'UP') {
    return <BiCaretUp className="text-green-500" />;
  }

  if (variation === 'DOWN') {
    return <BiCaretDown className=" text-red-600" />;
  }
}
