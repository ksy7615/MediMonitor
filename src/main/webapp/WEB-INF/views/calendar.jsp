<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/style/calendar.css">
    <title>Title</title>
</head>
<body>
<div class="wrapper">
    <header>
        <div class="nav">
            <button class="material-icons"> < </button>
            <p class="current-date">June 2024</p>
            <button class="material-icons"> > </button>
        </div>
    </header>
    <div class="calendar">
        <ul class="weeks">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
        </ul>
        <ul class="days">
            <li class="inactive">26</li>
            <li class="inactive">27</li>
            <li class="inactive">28</li>
            <li class="inactive">29</li>
            <li class="inactive">30</li>
            <li class="inactive">31</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>20</li>
            <li>21</li>
            <li>22</li>
            <li>23</li>
            <li>24</li>
            <li>25</li>
            <li>26</li>
            <li>27</li>
            <li>28</li>
            <li>29</li>
            <li>30</li>
        </ul>
    </div>
</div>
<div class="date-select">
    <input type="date" class="date-start" value="1990-01-01"/>
    <span> To </span>
    <input type="date" class="date-end" value="2024-06-24"/>
</div>
</body>
</html>
