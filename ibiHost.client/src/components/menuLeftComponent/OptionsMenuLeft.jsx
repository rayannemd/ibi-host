function OptionsMenuLeft({ items = [], onNavigate }) {
  return (
    <div className="containerOptionsMenuLeft">
      {items.map((item, index) => (
        <div key={index} onClick={()=> onNavigate(item.route)} className="optionItem">
          <span className="icon">{item.icon}</span>
          <span className="title">{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export default OptionsMenuLeft;