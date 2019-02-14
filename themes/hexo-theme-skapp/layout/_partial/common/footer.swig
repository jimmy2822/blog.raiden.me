<!-- 页脚 -->
<footer class="page__footer">
    <section class="footer__bottom">
        <div class="page__container footer__container">
            <p class="footer__copyright"> Copyright © 2019 Indie Jimmy. All rights reserved </p>

            <ul class="footer__social-network clearfix">
                {% if site.data.contact %}
                {% for item in site.data.contact %}
                    <li class="social-network__item">
                        <a href="{{ item.link }}" target="_blank" title="{{ item.title }}">
                            <i class="iconfont {{ item.icon }}"></i>
                        </a>
                    </li>
                {% endfor %}
                {% endif %}
            </ul>
        </div>
    </section>
</footer>
