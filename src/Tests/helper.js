export const findByAttr = (component, attr, value)=>{
    return component.find(`[${attr}='${value}']`);
};
