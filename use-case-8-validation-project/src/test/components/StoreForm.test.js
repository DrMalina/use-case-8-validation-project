import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test-utils.js";
import { StoreForm } from "../../components/StoreForm.js";
import { initialFormValues } from "../../store/index.js";

describe("StoreForm", () => {
  it("should render input for 'First Name'", () => {
    renderWithProviders(<StoreForm />);

    expect(
      screen.getByRole("textbox", { name: /First Name/i })
    ).toBeInTheDocument();
  });

  it("should render input for 'Last Name'", () => {
    renderWithProviders(<StoreForm />);

    expect(
      screen.getByRole("textbox", { name: /Last Name/i })
    ).toBeInTheDocument();
  });

  it("should render input for 'Email'", () => {
    renderWithProviders(<StoreForm />);

    expect(screen.getByRole("textbox", { name: /Email/i })).toBeInTheDocument();
  });

  it("should render input for 'Message'", () => {
    renderWithProviders(<StoreForm />);

    expect(
      screen.getByRole("textbox", { name: /Message/i })
    ).toBeInTheDocument();
  });

  it("should reflect value for 'First Name' from store", () => {
    renderWithProviders(<StoreForm />, {
      form: {
        ...initialFormValues,
        firstName: "John",
      },
    });

    expect(screen.getByRole("textbox", { name: /First Name/i })).toHaveValue(
      "John"
    );
  });

  it("should reflect value for 'Last Name' from store", () => {
    renderWithProviders(<StoreForm />, {
      form: {
        ...initialFormValues,
        lastName: "Doe",
      },
    });

    expect(screen.getByRole("textbox", { name: /Last Name/i })).toHaveValue(
      "Doe"
    );
  });

  it("should reflect value for 'Email' from store", () => {
    renderWithProviders(<StoreForm />, {
      form: {
        ...initialFormValues,
        email: "test@example.com",
      },
    });

    expect(screen.getByRole("textbox", { name: /Email/i })).toHaveValue(
      "test@example.com"
    );
  });

  it("should reflect value for 'Message' from store", () => {
    renderWithProviders(<StoreForm />, {
      form: {
        ...initialFormValues,
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus, odio eu.",
      },
    });

    expect(screen.getByRole("textbox", { name: /Message/i })).toHaveValue(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus, odio eu."
    );
  });

  describe("inputs validation", () => {
    it("should show error message when 'First Name' input is invalid", () => {
      renderWithProviders(<StoreForm />);

      fireEvent.blur(screen.getByRole("textbox", { name: /First Name/i }));

      expect(
        screen.getByRole("textbox", { name: /Value must be present/i })
      ).toBeInTheDocument();
    });

    it("should not show error message when 'First Name' input is valid", () => {
      renderWithProviders(<StoreForm />);

      userEvent.type(
        screen.getByRole("textbox", { name: /First Name/i }),
        "John"
      );

      expect(
        screen.queryByRole("textbox", { name: /Value must be present/i })
      ).not.toBeInTheDocument();
    });

    it("should show error message when 'Last Name' input is invalid", () => {
      renderWithProviders(<StoreForm />);

      fireEvent.blur(screen.getByRole("textbox", { name: /Last Name/i }));

      expect(
        screen.getByRole("textbox", { name: /Value must be present/i })
      ).toBeInTheDocument();
    });

    it("should not show error message when 'Last Name' input is valid", () => {
      renderWithProviders(<StoreForm />);

      userEvent.type(
        screen.getByRole("textbox", { name: /Last Name/i }),
        "Doe"
      );

      expect(
        screen.queryByRole("textbox", { name: /Value must be present/i })
      ).not.toBeInTheDocument();
    });

    it("should show error message when user types invalid email", () => {
      renderWithProviders(<StoreForm />);

      userEvent.type(
        screen.getByRole("textbox", { name: /Email/i }),
        "invalid_email"
      );

      expect(
        screen.getByRole("textbox", { name: /Value must be a valid email/i })
      ).toBeInTheDocument();
    });

    it("should not show error message when user types valid email", () => {
      renderWithProviders(<StoreForm />);

      userEvent.type(
        screen.getByRole("textbox", { name: /Email/i }),
        "test@example.com"
      );

      expect(
        screen.queryByRole("textbox", { name: /Value must be a valid email/i })
      ).not.toBeInTheDocument();
    });

    it("should show error message when user types message that is less than 10 chars long", () => {
      renderWithProviders(<StoreForm />);

      userEvent.type(
        screen.getByRole("textbox", { name: /Message/i }),
        "too short"
      );

      expect(
        screen.getByRole("textbox", {
          name: /Message must be minimum 10 characters long/i,
        })
      ).toBeInTheDocument();
    });

    it("should not show error message when user types valid Message", () => {
      renderWithProviders(<StoreForm />);

      userEvent.type(
        screen.getByRole("textbox", { name: /Message/i }),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus, odio eu."
      );

      expect(
        screen.queryByRole("textbox", {
          name: /Message must be minimum 10 characters long/i,
        })
      ).not.toBeInTheDocument();
    });
  });
  describe("submit", () => {
    it("should disable submit button when form is empty", () => {
      renderWithProviders(<StoreForm />, {
        form: {
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        },
      });

      expect(screen.getByRole("button", { name: /Submit/i })).toBeDisabled();
    });

    it("should disable submit button is not completely filled", () => {
      renderWithProviders(<StoreForm />, {
        form: {
          firstName: "Foo",
          lastName: "Bar",
          email: "",
          message: "",
        },
      });

      expect(screen.getByRole("button", { name: /Submit/i })).toBeDisabled();
    });

    it("should disable submit button when at least one input field is invalid", () => {
      renderWithProviders(<StoreForm />);

      userEvent.type(
        screen.getByRole("textbox", { name: /First Name/i }),
        "John"
      );

      userEvent.type(
        screen.getByRole("textbox", { name: /Last Name/i }),
        "Doe"
      );

      userEvent.type(
        screen.getByRole("textbox", { name: /Email/i }),
        "testexample.com"
      );

      userEvent.type(
        screen.getByRole("textbox", { name: /Message/i }),
        "Lorem ipsum."
      );

      expect(screen.getByRole("button", { name: /Submit/i })).toBeDisabled();
    });

    it("should properly submit form when all inputs are valid", () => {
      const alertMock = jest.spyOn(window, "alert").mockImplementation();
      const { store } = renderWithProviders(<StoreForm />);

      userEvent.type(
        screen.getByRole("textbox", { name: /First Name/i }),
        "John"
      );

      userEvent.type(
        screen.getByRole("textbox", { name: /Last Name/i }),
        "Doe"
      );

      userEvent.type(
        screen.getByRole("textbox", { name: /Email/i }),
        "test@example.com"
      );

      userEvent.type(
        screen.getByRole("textbox", { name: /Message/i }),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus, odio eu."
      );

      const submitBtn = screen.getByRole("button", { name: /Submit/i });

      expect(submitBtn).not.toBeDisabled();

      userEvent.click(submitBtn);

      expect(alertMock).toHaveBeenCalledTimes(1);
      expect(store.getState()).toMatchObject({
        form: {
          firstName: "John",
          lastName: "Doe",
          email: "test@example.com",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus, odio eu.",
        },
      });
    });
  });
});
