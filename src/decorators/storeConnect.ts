
/**
 *  react-redux 的装饰器写法有点问题https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9951
    如果要直接@connect(mapStateToProps,null) 那么就必须用require 导入 const { connect } = require('react-redux'); 
    如果是import 导入，要么@(connect(mapStateToProps,null) as any) 这种写法，要么像下面这样重新写重新export
 */
import {
  connect as originalConnect, MapDispatchToPropsParam, MapStateToPropsParam, MergeProps, Options
} from "react-redux";
import * as React from "react";
export interface InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> {
  <TComponent extends React.ComponentType<TInjectedProps & TNeedsProps>>(component: TComponent): TComponent;
}

interface StoreConnect {
  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps>,
    mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
  ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;

  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps>,
    mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
    options?: Options<TStateProps, TOwnProps, TMergedProps>
  ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;

}

export const connect = originalConnect as StoreConnect;