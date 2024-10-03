declare const _default: "\n.time-picker {\n  font-family: Arial, sans-serif;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n\n.time-picker.small {\n  width: 180px;\n  font-size: 14px;\n}\n\n.time-picker.medium {\n  width: 220px;\n  font-size: 16px;\n}\n\n.time-picker.large {\n  width: 260px;\n  font-size: 18px;\n}\n\n.time-picker.light {\n  background-color: #ffffff;\n  color: #333333;\n}\n\n.time-picker.dark {\n  background-color: #333333;\n  color: #ffffff;\n}\n\n.time-display {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 20px;\n}\n\n.time-unit {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  height: 120px;\n}\n\n.number-wrapper {\n  height: 60px;\n  width: 60px;\n  overflow: hidden;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.time-unit input {\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  font-size: 2.5em;\n  border: none;\n  background: transparent;\n  color: inherit;\n  padding: 0;\n  margin: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.time-unit input:focus {\n  outline: none;\n  background-color: rgba(0, 123, 255, 0.1);\n}\n\n.separator {\n  font-size: 2em;\n  margin: 0 0.5em;\n}\n\n.arrow {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: inherit;\n  padding: 10px;\n  opacity: 0.5;\n  transition: all 0.3s ease;\n}\n\n.arrow:hover {\n  opacity: 1;\n}\n\n.arrow svg {\n  width: 24px;\n  height: 24px;\n  fill: currentColor;\n}\n\n.period button {\n  background: none;\n  border: none;\n  color: inherit;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 1em;\n  margin-left: 10px;\n  transition: all 0.3s ease;\n}\n\n.period button:hover {\n  background-color: rgba(0, 123, 255, 0.1);\n}\n\n@keyframes slideOutUp {\n  from { transform: translateY(0); opacity: 1; }\n  to { transform: translateY(-100%); opacity: 0; }\n}\n\n@keyframes slideInUp {\n  from { transform: translateY(100%); opacity: 0; }\n  to { transform: translateY(0); opacity: 1; }\n}\n\n@keyframes slideOutDown {\n  from { transform: translateY(0); opacity: 1; }\n  to { transform: translateY(100%); opacity: 0; }\n}\n\n@keyframes slideInDown {\n  from { transform: translateY(-100%); opacity: 0; }\n  to { transform: translateY(0); opacity: 1; }\n}\n\n.slide-out-up { animation: slideOutUp 0.3s ease forwards; }\n.slide-in-up { animation: slideInUp 0.3s ease forwards; }\n.slide-out-down { animation: slideOutDown 0.3s ease forwards; }\n.slide-in-down { animation: slideInDown 0.3s ease forwards; }\n\n.time-number {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 2.5em;\n}\n";
export default _default;
