import { useDispatch, useSelector } from 'react-redux';

import type { IndependentServiceWorkflowState } from '../../../types/independentServiceWorkflow';

export const useWorkflowState = () => {
  const dispatch = useDispatch<any>();
  const workflow = useSelector(
    (state: any) =>
      state.independentServiceWorkflow as IndependentServiceWorkflowState,
  );

  return {
    dispatch,
    workflow,
    service: workflow.activeService,
  };
};
