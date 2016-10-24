module ApplicationHelper
  def current_class(*controller)
    controller.include?(params[:controller]) ? 'active ': ''
  end

  def sortable(column, title = nil, custom_path = nil)
    title ||= column.titleize
    css_class = column == sort_column ? "current #{sort_direction}" : nil
    direction = column == sort_column && sort_direction == "asc" ? "desc" : "asc"
    path = (custom_path ? custom_path : params).merge(sort: column, direction: direction).permit!
    link_to "<span>#{title}</span>".html_safe, path, {class: css_class}
  end

  def article_with_background record, &block
    bkg_image = if record.image
                 "url('#{record.image(:original)}')"
                else
                  nil
                end

    content_tag(:article,
                class: "l-intro #{"-campaigns-detail" unless bkg_image}",
                style: "#{"background-image: #{bkg_image}" if bkg_image}") do
      yield
    end
  end
end
