package com.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.Condition;
import com.model.DurationPreset;
import com.model.ItemCategory;
import com.service.ConditionDAO;
import com.service.DurationPresetDAO;
import com.service.ItemCategoryDAO;


@WebServlet("/EditDropdownServlet")
public class EditDropdownServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        switch (action) {
            case "editCategory":
                // Fetch category data and forward to JSP
			List<ItemCategory> categories = null;
			try {
				categories = fetchCategories();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
                request.setAttribute("categories", categories);
                request.getRequestDispatcher("editCategories.jsp").forward(request, response);
                break;
            case "editDuration":
                // Fetch duration data and forward to JSP
			List<DurationPreset> durations = null;
			try {
				durations = fetchDurations();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
                request.setAttribute("durations", durations);
                request.getRequestDispatcher("editDurations.jsp").forward(request, response);
                break;
            case "editCondition":
                // Fetch condition data and forward to JSP
			List<Condition> conditions = null;
			try {
				conditions = fetchConditions();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} // Assuming conditions are simple strings
                request.setAttribute("conditions", conditions);
                request.getRequestDispatcher("editConditions.jsp").forward(request, response);
                break;
        }
    }

    private List<ItemCategory> fetchCategories() throws ClassNotFoundException {
        ItemCategoryDAO categoryDAO = new ItemCategoryDAO();
        return categoryDAO.getAllCategories();
    }

    private List<DurationPreset> fetchDurations() throws ClassNotFoundException {
        DurationPresetDAO durationDAO = new DurationPresetDAO();
        return durationDAO.getAllDurations();
    }

    private List<Condition> fetchConditions() throws ClassNotFoundException {
        ConditionDAO conditionDAO = new ConditionDAO();
        return conditionDAO.getAllConditions();
    }
}